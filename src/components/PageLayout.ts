import styled from 'styled-components';

export const PageWrapper = styled.div.attrs({
  className: 'page-wrapper',
})`
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing[8]};
  padding-bottom: calc(${({ theme }) => theme.spacing[8]} + 4.5rem);
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[32]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ theme }) => theme.spacing[4]};
    padding-right: ${({ theme }) => theme.spacing[4]};
    padding-bottom: calc(${({ theme }) => theme.spacing[4]} + 9rem);
    padding-left: ${({ theme }) => theme.spacing[4]};
  }
`;

export const PageTitle = styled.h2.attrs({
  className: 'page-title',
})`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const PageDescription = styled.p.attrs({
  className: 'page-description',
})`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
`;

export const PageSection = styled.section.attrs({
  className: 'page-section',
})`
  margin-bottom: ${({ theme }) => theme.spacing[12]};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PageContent = styled.div.attrs({
  className: 'page-content',
})`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;
