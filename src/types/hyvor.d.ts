declare namespace JSX {
  interface IntrinsicElements {
    'hyvor-talk-comments': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'website-id'?: string;
        'page-id'?: string;
      },
      HTMLElement
    >;
    'hyvor-talk-newsletter': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'website-id'?: string;
      },
      HTMLElement
    >;
  }
}
