import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiRotateCw } from 'react-icons/fi';
import { useTranslation } from '../../i18n';

type Props = {
  client: string;
  description: string;
  technologies: string[];
};

export const MobileProjectCard = ({ client, description, technologies }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const gesture = useRef({ x: 0, y: 0, moved: false });
  const { language } = useTranslation();
  const showTechnologies = language === 'it' ? 'Mostra tecnologie' : 'Show technologies';
  const showDescription = language === 'it' ? 'Torna alla descrizione' : 'Back to description';

  return (
    <Card type="button"
      onPointerDown={(event) => { gesture.current = { x: event.clientX, y: event.clientY, moved: false }; }}
      onPointerMove={(event) => {
        if (Math.abs(event.clientX - gesture.current.x) > 8 || Math.abs(event.clientY - gesture.current.y) > 8) {
          gesture.current.moved = true;
        }
      }}
      onPointerCancel={() => { gesture.current.moved = true; }}
      onClick={(event) => {
        if (event.detail === 0 || !gesture.current.moved) setFlipped((value) => !value);
      }}
      aria-label={`${client}: ${flipped ? showDescription : showTechnologies}`} aria-pressed={flipped}>
      <Faces $flipped={flipped}>
        <Face aria-hidden={flipped}>
          <Title>{client}</Title>
          <Description>{description}</Description>
          <Hint><FiRotateCw aria-hidden="true" />{showTechnologies}</Hint>
        </Face>
        <Face $back aria-hidden={!flipped}>
          <Title>{client}</Title>
          <BadgeList>
            {technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}
          </BadgeList>
          <Hint><FiRotateCw aria-hidden="true" />{showDescription}</Hint>
        </Face>
      </Faces>
    </Card>
  );
};

const Card = styled.button`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.text};
    text-align: left;
    perspective: 1200px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 4px;
    }
  }
`;

const Faces = styled.span<{ $flipped: boolean }>`
  display: grid;
  min-height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(${({ $flipped }) => $flipped ? '180deg' : '0deg'});
  transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Face = styled.span<{ $back?: boolean }>`
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(${({ $back }) => $back ? '180deg' : '0deg'});
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.4;
`;

const Description = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 14px;
  line-height: 1.65;
  text-align: justify;
  hyphens: auto;
`;

const BadgeList = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Badge = styled.span`
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background};
  font-size: 13px;
  line-height: 1.5;
`;

const Hint = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 12px;
  line-height: 1.4;
`;
