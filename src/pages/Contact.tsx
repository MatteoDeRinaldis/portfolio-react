import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiMail } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
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
type ContactValues = Record<ContactField, string>;
type ContactFormValues = ContactValues & { botcheck: boolean };

const contactDraft: ContactValues = {
  name: '',
  email: '',
  message: '',
};

export const Contact: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit: handleFormSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: { ...contactDraft, botcheck: false },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVariant, setSnackbarVariant] = useState<'error' | 'success'>('error');
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (!snackbarMessage || snackbarVariant !== 'success') return;
    const timer = window.setTimeout(() => setSnackbarMessage(''), 6000);
    return () => window.clearTimeout(timer);
  }, [snackbarMessage, snackbarVariant]);

  const handleSubmit = async (formValues: ContactFormValues) => {
    if (sendingRef.current) return;
    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const message = formValues.message.trim();
    const nextValues = { name, email, message };
    setValue('name', name);
    setValue('email', email);
    setValue('message', message);
    Object.assign(contactDraft, nextValues);

    setSnackbarVariant('error');
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
          botcheck: Boolean(formValues.botcheck),
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Contact submission failed');

      const emptyValues = { name: '', email: '', message: '' };
      reset({ ...emptyValues, botcheck: false });
      Object.assign(contactDraft, emptyValues);
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

  const handleInvalidSubmit = (invalidFields: FieldErrors<ContactFormValues>) => {
    setSnackbarVariant('error');
    setSnackbarMessage(t('contact.validationError'));
    const firstInvalidField = (['name', 'email', 'message'] as const).find(
      (field) => invalidFields[field],
    );
    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
    }
  };

  const handleFieldChange = (
    field: ContactField,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => unknown,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.value = event.currentTarget.value.trimStart();
    onChange(event);
    const currentValues = getValues();
    const nextValues = {
      name: currentValues.name,
      email: currentValues.email,
      message: currentValues.message,
      [field]: event.currentTarget.value,
    };
    Object.assign(contactDraft, nextValues);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email);
    const isComplete = nextValues.name.length > 0 && nextValues.message.length > 0 && emailIsValid;

    if (isComplete) {
      setSnackbarMessage('');
    }
  };

  const nameRegistration = register('name', {
    validate: (value) => value.trim().length > 0 || t('contact.nameRequired'),
  });
  const emailRegistration = register('email', {
    validate: (value) => {
      const email = value.trim();
      if (!email) return t('contact.emailRequired');
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || t('contact.emailInvalid');
    },
  });
  const messageRegistration = register('message', {
    validate: (value) => value.trim().length > 0 || t('contact.messageRequired'),
  });

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
          onSubmit={handleFormSubmit(handleSubmit, handleInvalidSubmit)}
          aria-busy={isSending}
          noValidate
          initial={{ opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.5, ease: 'easeOut' }}
        >
          <input type="checkbox" hidden tabIndex={-1} autoComplete="off" {...register('botcheck')} />
          <FormRow>
            <Field
              as={motion.div}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.85, ease: 'easeOut' }}
            >
              <Label htmlFor="contact-name">{t('contact.nameLabel')}</Label>
              <Input
                {...nameRegistration}
                id="contact-name"
                type="text"
                placeholder={t('contact.namePlaceholder')}
                disabled={isSending}
                onChange={handleFieldChange('name', nameRegistration.onChange)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name?.message ? 'contact-name-error' : undefined}
              />
              {errors.name?.message ? (
                <FieldError id="contact-name-error">
                  <FiAlertCircle aria-hidden="true" />
                  {errors.name.message}
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
                {...emailRegistration}
                id="contact-email"
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                disabled={isSending}
                onChange={handleFieldChange('email', emailRegistration.onChange)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email?.message ? 'contact-email-error' : undefined}
              />
              {errors.email?.message ? (
                <FieldError id="contact-email-error">
                  <FiAlertCircle aria-hidden="true" />
                  {errors.email.message}
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
              {...messageRegistration}
              id="contact-message"
              placeholder={t('contact.messagePlaceholder')}
              disabled={isSending}
              onChange={handleFieldChange('message', messageRegistration.onChange)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message?.message ? 'contact-message-error' : undefined}
            />
            {errors.message?.message ? (
              <FieldError id="contact-message-error">
                <FiAlertCircle aria-hidden="true" />
                {errors.message.message}
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
