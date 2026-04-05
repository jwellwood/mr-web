import { CustomTypography, SectionContainer } from '../../../../components';
import { terms } from '.';

export default function TermsOfUseContent() {
  return terms.map((section, index) => {
    return (
      <div key={index} style={{ marginBottom: '1.5rem' }}>
        <SectionContainer title={`${index + 1}. ${section.title}`}>
          {section.content.map((item, itemIndex) => (
            <div key={itemIndex} style={{ marginBottom: '8px' }}>
              <CustomTypography
                bold
                color="data"
              >{`${index + 1}.${itemIndex + 1}`}</CustomTypography>{' '}
              <CustomTypography color="label">{item}</CustomTypography>
            </div>
          ))}
        </SectionContainer>
      </div>
    );
  });
}
