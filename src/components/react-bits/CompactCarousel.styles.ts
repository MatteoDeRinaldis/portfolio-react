import styled from 'styled-components';

export const CompactCarousel = styled.div<{ $layout?: 'inline' | 'stacked' }>`
  width: 100%;
  min-width: 0;
  overflow-x: clip;

  .carousel-container {
    gap: ${({ theme }) => theme.spacing[1]};
    width: 100%;
  }

  .carousel-stage {
    gap: ${({ theme }) => theme.spacing[2]};
  }

  .carousel-card {
    align-items: ${({ $layout }) => ($layout === 'inline' ? 'center' : 'flex-start')};
    justify-content: center;
    flex-direction: ${({ $layout }) => ($layout === 'inline' ? 'row' : 'column')};
    gap: ${({ theme }) => theme.spacing[1]};
    padding: ${({ theme, $layout }) => ($layout === 'inline'
      ? `${theme.spacing[1]} ${theme.spacing[3]}`
      : theme.spacing[1])};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.text};
  }

  .carousel-card-rim {
    box-shadow: none;
  }

  .carousel-icon {
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
  }

  .carousel-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .carousel-text {
    min-width: 0;
    margin-top: 0;
    opacity: 1;
  }

  .carousel-title {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.68rem;
    line-height: 1.1;
  }

  .carousel-description {
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.56rem;
    line-height: 1;
  }

  .carousel-controls {
    gap: ${({ theme }) => theme.spacing[2]};
  }

  .carousel-bars {
    gap: ${({ theme }) => theme.spacing[2]};
  }

  .carousel-bar {
    height: 12px;
  }

  .carousel-bar-track {
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
  }

  .carousel-bar-fill {
    background: ${({ theme }) => theme.colors.primary};
  }

  .carousel-container:focus-visible .carousel-stage {
    outline-color: ${({ theme }) => theme.colors.primary};
  }
`;
