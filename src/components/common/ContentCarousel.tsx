import React, { ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../../i18n';

const ArrowLeftIcon = FiArrowLeft as any;
const ArrowRightIcon = FiArrowRight as any;

type ContentCarouselProps<T> = {
  title: string;
  description?: string;
  items: T[];
  itemsPerPage?: number;
  renderItem: (item: T, index: number) => ReactNode;
};

export const ContentCarousel = <T,>({
  title,
  description,
  items,
  itemsPerPage = 1,
  renderItem,
}: ContentCarouselProps<T>) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const pages = useMemo(() => {
    const chunkedItems: T[][] = [];

    for (let i = 0; i < items.length; i += itemsPerPage) {
      chunkedItems.push(items.slice(i, i + itemsPerPage));
    }

    return chunkedItems;
  }, [items, itemsPerPage]);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex === 0 ? totalPages - 1 : currentIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex === totalPages - 1 ? 0 : currentIndex + 1));
  };

  return (
    <CarouselSection>
      <CarouselHeader>
        <div>
          <SectionEyebrow>{title}</SectionEyebrow>
          {description ? <SectionDescription>{description}</SectionDescription> : null}
        </div>
        <CarouselControls aria-label={t('common.navigation', { title })}>
          <IconButton type="button" onClick={goToPrevious} aria-label={t('common.previous')}>
            <ArrowLeftIcon aria-hidden="true" />
          </IconButton>
          <Counter aria-live="polite">
            {activeIndex + 1}/{totalPages}
          </Counter>
          <IconButton type="button" onClick={goToNext} aria-label={t('common.next')}>
            <ArrowRightIcon aria-hidden="true" />
          </IconButton>
        </CarouselControls>
      </CarouselHeader>
      <CarouselViewport>
        <CarouselTrack $activeIndex={activeIndex}>
          {pages.map((pageItems, pageIndex) => (
            <CarouselSlide key={`${title}-page-${pageIndex}`} $itemsPerPage={itemsPerPage}>
              {pageItems.map((item, itemIndex) => renderItem(item, pageIndex * itemsPerPage + itemIndex))}
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </CarouselViewport>
      <Dots role="tablist" aria-label={t('common.selectTitle', { title })}>
        {pages.map((_, index) => (
          <Dot
            key={`${title}-dot-${index}`}
            type="button"
            aria-label={t('common.showItem', { index: index + 1 })}
            aria-selected={activeIndex === index}
            $isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </Dots>
    </CarouselSection>
  );
};

const CarouselSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[6]};

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SectionEyebrow = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
`;

const SectionDescription = styled.p`
  max-width: 720px;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CarouselControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex: 0 0 auto;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

const Counter = styled.span`
  min-width: 3rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: center;
`;

const CarouselViewport = styled.div`
  overflow: hidden;
`;

const CarouselTrack = styled.div<{ $activeIndex: number }>`
  display: flex;
  transform: translateX(-${({ $activeIndex }) => $activeIndex * 100}%);
  transition: transform ${({ theme }) => theme.transitions.base};
`;

const CarouselSlide = styled.div<{ $itemsPerPage: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $itemsPerPage }) => $itemsPerPage}, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  min-width: 100%;
  align-items: stretch;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    grid-template-columns: 1fr;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? '1.75rem' : '0.75rem')};
  height: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;
