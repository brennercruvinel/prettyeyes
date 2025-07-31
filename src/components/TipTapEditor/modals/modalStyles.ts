export const modalStyles = {
  modal: {
    defaultProps: {
      centered: true,
      overlayProps: {
        backgroundOpacity: 0.55,
        blur: 3,
      },
    },
    styles: {
      title: {
        fontSize: '1.125rem',
        fontWeight: 600,
      },
      body: {
        padding: '1.5rem',
      },
      header: {
        backgroundColor: '#161b22',
        borderBottom: '1px solid #30363d',
      },
      content: {
        backgroundColor: '#161b22',
      },
    },
  },
  input: {
    backgroundColor: '#0d1117',
    borderColor: '#30363d',
    color: '#c9d1d9',
    '&:focus': {
      borderColor: '#58a6ff',
    },
    '&::placeholder': {
      color: '#6e7681',
    },
  },
  label: {
    marginBottom: '0.25rem',
    color: '#c9d1d9',
  },
  button: {
    default: {
      backgroundColor: '#0d1117',
      borderColor: '#30363d',
      color: '#c9d1d9',
      '&:hover': {
        backgroundColor: '#161b22',
      },
    },
    primary: {
      backgroundColor: '#58a6ff',
      '&:hover': {
        backgroundColor: '#1f6feb',
      },
      '&:disabled': {
        backgroundColor: '#30363d',
        color: '#6e7681',
      },
    },
  },
  tabs: {
    tab: {
      backgroundColor: 'transparent',
      color: '#8b949e',
      borderColor: '#30363d',
      '&[data-active]': {
        backgroundColor: '#161b22',
        color: '#c9d1d9',
        borderColor: '#58a6ff',
      },
    },
  },
  checkbox: {
    input: {
      backgroundColor: '#0d1117',
      borderColor: '#30363d',
      '&:checked': {
        backgroundColor: '#58a6ff',
        borderColor: '#58a6ff',
      },
    },
  },
  select: {
    input: {
      backgroundColor: '#0d1117',
      borderColor: '#30363d',
      color: '#c9d1d9',
      '&:focus': {
        borderColor: '#58a6ff',
      },
    },
    dropdown: {
      backgroundColor: '#161b22',
      borderColor: '#30363d',
    },
    item: {
      color: '#c9d1d9',
      '&[data-hovered]': {
        backgroundColor: '#30363d',
      },
      '&[data-selected]': {
        backgroundColor: '#58a6ff',
      },
    },
  },
};