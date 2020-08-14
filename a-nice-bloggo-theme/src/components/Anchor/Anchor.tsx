import styled from "@emotion/styled";

const AnchorStyles = styled.a`
  transition: ${p => p.theme.colorModeTransition};
  color: ${p => p.theme.colors.accent};

  &:visited {
    color: ${p => p.theme.colors.accent};
    opacity: 0.85;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Anchor: React.FC<{}> = ({children, ...props}) => {
  // workaround for MDX breaking footnotes
  // TODO: consider removing MDX...
  const isFootnote = props.href.startsWith('#fnref');
  if (isFootnote) {
    props.id = props.href.replace('#', '').replace('ref', '');
  }

  return (
    <AnchorStyles  {...props}>
      {children}
    </AnchorStyles>
  );
};

export default Anchor;
