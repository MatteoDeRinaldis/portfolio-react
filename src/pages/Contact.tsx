import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiMail } from 'react-icons/fi';
import { useTranslation } from '../i18n';
import { PageTitle, PageDescription } from '../components/PageLayout';
import {
  ContactPageWrapper,
  ContactGrid,
  ContactForm,
  ContactCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardInfoList,
  CardInfoItem,
  CardInfoLabel,
  CardInfoValue,
  FormRow,
  Field,
  Label,
  Input,
  Message,
  FieldError,
  SubmitButton,
  ContactMail,
  Snackbar,
} from './Contact.styles';

// Public form identifier supplied by Web3Forms, intended for browser use.
const contactAccessKey = 'cd071282-745b-4c47-af3d-41fd395aeb56';
type ContactField = 'name' | 'email' | 'message';
type ContactErrors = Partial<Record<ContactField, string>>;
type ContactValues = Record<ContactField, string>;

const contactDraft: ContactValues = {
  name: '',
  email: '',
  message: '',
};

export const Contact: FC = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactValues>(() => contactDraft);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [snackbarVariant, setSnackbarVariant] = useState<'error' | 'success'>('error');
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (!snackbarMessage || snackbarVariant !== 'success') return;
    const timer = window.setTimeout(() => setSnackbarMessage(''), 6000);
    return () => window.clearTimeout(timer);
  }, [snackbarMessage, snackbarVariant]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingRef.current) return;
    setSnackbarVariant('error');
    setHasAttemptedSubmit(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const nextValues = { name, email, message };
    setValues(nextValues);
    Object.assign(contactDraft, nextValues);
    const nextErrors: ContactErrors = {};

    if (!name) {
      nextErrors.name = t('contact.nameRequired');
    }

    if (!email) {
      nextErrors.email = t('contact.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t('contact.emailInvalid');
    }

    if (!message) {
      nextErrors.message = t('contact.messageRequired');
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSnackbarMessage(t('contact.validationError'));
      const firstInvalidField = Object.keys(nextErrors)[0] as ContactField;
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    setSnackbarMessage('');
    sendingRef.current = true;
    setIsSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactAccessKey,
          ...nextValues,
          subject: t('contact.emailSubject', { name }),
          from_name: 'Portfolio Contact',
          botcheck: Boolean(formData.get('botcheck')),
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Contact submission failed');

      const emptyValues = { name: '', email: '', message: '' };
      setValues(emptyValues);
      Object.assign(contactDraft, emptyValues);
      setErrors({});
      setHasAttemptedSubmit(false);
      setSnackbarVariant('success');
      setSnackbarMessage(t('contact.sendSuccess'));
    } catch {
      setSnackbarVariant('error');
      setSnackbarMessage(t('contact.sendError'));
    } finally {
      window.clearTimeout(timeout);
      sendingRef.current = false;
      setIsSending(false);
    }
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const changedElement = event.currentTarget;
    const changedField = changedElement.name as ContactField;

    const nextValues = { ...values, [changedField]: changedElement.value.trimStart() };
    const { name, email, message } = nextValues;
    setValues(nextValues);
    Object.assign(contactDraft, nextValues);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isComplete = name.length > 0 && message.length > 0 && emailIsValid;

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };

      if (!hasAttemptedSubmit && !Object.prototype.hasOwnProperty.call(currentErrors, changedField)) {
        return nextErrors;
      }

      if (changedField === 'name') {
        if (name) {
          delete nextErrors.name;
        } else {
          nextErrors.name = t('contact.nameRequired');
        }
      }

      if (changedField === 'email') {
        if (emailIsValid) {
          delete nextErrors.email;
        } else {
          nextErrors.email = email ? t('contact.emailInvalid') : t('contact.emailRequired');
        }
      }

      if (changedField === 'message') {
        if (message) {
          delete nextErrors.message;
        } else {
          nextErrors.message = t('contact.messageRequired');
        }
      }

      return nextErrors;
    });

    if (isComplete) {
      setSnackbarMessage('');
    }
  };

  return (
    <ContactPageWrapper>
      <PageTitle
        as={motion.h2}
        initial={{ opacity: 0, x: -48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
      >
        {t('pages.contactTitle')}
      </PageTitle>
      <PageDescription
        as={motion.p}
        initial={{ opacity: 0, x: -48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
      >
        {t('pages.contactDescription')}
      </PageDescription>
      <ContactGrid>
        <ContactForm
          as={motion.form}
          onSubmit={handleSubmit}
          aria-busy={isSending}
          noValidate
          initial={{ opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: 'easeOut' }}
        >
          <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />
          <FormRow>
            <Field
              as={motion.div}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.85, ease: 'easeOut' }}
            >
              <Label htmlFor="contact-name">{t('contact.nameLabel')}</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                placeholder={t('contact.namePlaceholder')}
                value={values.name}
                disabled={isSending}
                onChange={handleFieldChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name ? (
                <FieldError id="contact-name-error">
                  <FiAlertCircle aria-hidden="true" />
                  {errors.name}
                </FieldError>
              ) : null}
            </Field>

            <Field
              as={motion.div}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
            >
              <Label htmlFor="contact-email">{t('contact.emailLabel')}</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                value={values.email}
                disabled={isSending}
                onChange={handleFieldChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email ? (
                <FieldError id="contact-email-error">
                  <FiAlertCircle aria-hidden="true" />
                  {errors.email}
                </FieldError>
              ) : null}
            </Field>
          </FormRow>

          <Field
            as={motion.div}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.35, ease: 'easeOut' }}
          >
            <Label htmlFor="contact-message">{t('contact.messageLabel')}</Label>
            <Message
              id="contact-message"
              name="message"
              placeholder={t('contact.messagePlaceholder')}
              value={values.message}
              disabled={isSending}
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message ? (
              <FieldError id="contact-message-error">
                <FiAlertCircle aria-hidden="true" />
                {errors.message}
              </FieldError>
            ) : null}
          </Field>

          <SubmitButton
            as={motion.button}
            type="submit"
            disabled={isSending}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.65, ease: 'easeOut' }}
          >
            {t(isSending ? 'contact.sending' : 'contact.submit')}
          </SubmitButton>
        </ContactForm>

        <ContactCard
          as={motion.div}
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.65, ease: 'easeOut' }}
        >
          <CardHeader>
            <CardTitle>{t('contact.cardTitle')}</CardTitle>
            <CardDescription>{t('contact.cardDescription')}</CardDescription>
          </CardHeader>
          <CardInfoList>
            <CardInfoItem>
              <CardInfoLabel>{t('contact.basedInLabel')}</CardInfoLabel>
              <CardInfoValue>{t('contact.basedInValue')}</CardInfoValue>
            </CardInfoItem>
            <CardInfoItem>
              <CardInfoLabel>{t('contact.workPreferenceLabel')}</CardInfoLabel>
              <CardInfoValue>{t('contact.workPreferenceValue')}</CardInfoValue>
            </CardInfoItem>
            <CardInfoItem>
              <CardInfoLabel>{t('contact.languagesLabel')}</CardInfoLabel>
              <CardInfoValue>{t('contact.languagesValue')}</CardInfoValue>
            </CardInfoItem>
            <CardInfoItem>
              <CardInfoLabel>{t('contact.focusLabel')}</CardInfoLabel>
              <CardInfoValue>{t('contact.focusValue')}</CardInfoValue>
            </CardInfoItem>
          </CardInfoList>
        </ContactCard>
      </ContactGrid>
      <ContactMail
        as={motion.div}
        aria-hidden="true"
        initial={{ opacity: 0, x: 320, rotate: -25 }}
        animate={{ opacity: 0.1, x: 0, rotate: -25 }}
        transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
      >
        <FiMail />
      </ContactMail>
      <AnimatePresence>
        {snackbarMessage ? (
          <Snackbar
            $variant={snackbarVariant}
            role={snackbarVariant === 'success' ? 'status' : 'alert'}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {snackbarVariant === 'success' ? <FiCheckCircle aria-hidden="true" /> : <FiAlertTriangle aria-hidden="true" />}
            {snackbarMessage}
          </Snackbar>
        ) : null}
      </AnimatePresence>
    </ContactPageWrapper>
  );
};
