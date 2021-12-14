import {extendTheme, themeTools} from 'native-base';

export default extendTheme({
  fontConfig: {
    FredokaOne: {
      700: {
        normal: 'FredokaOne-Regular',
      },
    },
    Montserrat: {
      100: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      200: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      300: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      400: {
        normal: 'Montserrat-Regular',
        italic: 'Montserrat-Italic',
      },
      500: {
        normal: 'Montserrat-Medium',
      },
      600: {
        normal: 'Montserrat-Medium',
        italic: 'Montserrat-MediumItalic',
      },
      700: {
        normal: 'Montserrat-Bold',
      },
      800: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
      900: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'FredokaOne',
    body: 'Montserrat',
    mono: 'Montserrat',
  },
  components: {
    Center: {
      baseStyle: props => {
        return {
          bg: themeTools.mode('muted.50', 'muted.900')(props),
        };
      },
    },
    Heading: {
      baseStyle: props => {
        return {
          color: themeTools.mode('muted.800', 'muted.100')(props),
          fontFamily: 'heading',
        };
      },
    },
    Text: {
      baseStyle: props => {
        return {
          color: themeTools.mode('muted.800', 'muted.100')(props),
          fontFamily: 'body',
        };
      },
    },
    Button: {
      baseStyle: props => {
        return {
          rounded: 'lg',
          fontFamily: 'heading',
        };
      },
      defaultProps: {
        colorScheme: 'lightBlue',
      },
    },
  },
});
