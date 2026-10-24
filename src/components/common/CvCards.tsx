import React, { ElementType, FC } from 'react';
import styled from 'styled-components';
import {
  FiBriefcase,
  FiCheckCircle,
  FiCompass,
  FiDatabase,
  FiGitBranch,
  FiGrid,
  FiMonitor,
  FiPenTool,
  FiShield,
  FiSmartphone,
  FiTool,
} from 'react-icons/fi';
import type { ProfessionalExperience, SkillCategory, SkillIcon } from '../../data/cv';

const BriefcaseIcon = FiBriefcase as any;
const skillIcons: Record<SkillIcon, ElementType> = {
  frontend: FiMonitor,
  mobile: FiSmartphone,
  ui: FiGrid,
  tools: FiTool,
  devops: FiGitBranch,
  testing: FiCheckCircle,
  design: FiPenTool,
  backend: FiDatabase,
  security: FiShield,
  methodologies: FiCompass,
};

export const SkillCard: FC<{ skill: SkillCategory; isHighlighted?: boolean }> = ({ skill, isHighlighted = false }) => {
  const SkillIcon = skillIcons[skill.icon];

  return (
    <SkillCardWrapper $isHighlighted={isHighlighted}>
      <SkillCardHeader>
        <CardIcon>
          <SkillIcon aria-hidden="true" />
        </CardIcon>
        <SkillCardTitle>{skill.title}</SkillCardTitle>
      </SkillCardHeader>
      <SkillList>
        {skill.items.map((item) => (
          <SkillItem key={item}>{item}</SkillItem>
        ))}
      </SkillList>
    </SkillCardWrapper>
  );
};

export const ExperienceCard: FC<{ experience: ProfessionalExperience }> = ({ experience }) => (
  <ExperienceCardWrapper>
    <ExperienceHeader>
      <CardIcon>
        <BriefcaseIcon aria-hidden="true" />
      </CardIcon>
      <div>
        <CardTitle>{experience.company}</CardTitle>
        <ExperienceMeta>
          {experience.location} | {experience.period}
        </ExperienceMeta>
      </div>
    </ExperienceHeader>
    <ProjectList>
      {experience.projects.map((project) => (
        <ProjectItem key={`${experience.company}-${project.client}`}>
          <ProjectTitle>{project.client}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <TagList>
            {project.technologies.map((technology) => (
              <Tag key={`${project.client}-${technology}`}>{technology}</Tag>
            ))}
          </TagList>
        </ProjectItem>
      ))}
    </ProjectList>
  </ExperienceCardWrapper>
);

const Card = styled.article`
  min-height: 22rem;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const SkillCardWrapper = styled.article<{ $isHighlighted: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 15rem;
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme, $isHighlighted }) =>
    $isHighlighted
      ? theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.86)' : 'rgba(17, 17, 17, 0.62)'
      : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.35)' : 'rgba(255, 255, 255, 0.35)')};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.86)' : 'rgba(17, 17, 17, 0.62)'};
    transform: translateY(-3px);
  }
`;

const SkillCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')};
`;

const CardIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  color: ${({ theme }) => theme.colors.primary};

  svg {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const SkillCardTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SkillItem = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.02em;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExperienceCardWrapper = styled(Card)`
  min-height: 31rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
  }
`;

const CardTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text};
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  ${CardIcon} {
    margin-bottom: 0;
  }
`;

const ExperienceMeta = styled.p`
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ProjectList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ProjectItem = styled.div`
  padding-top: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProjectTitle = styled.h5`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.secondary};
`;

const ProjectDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textLight};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  overflow-wrap: anywhere;
`;
