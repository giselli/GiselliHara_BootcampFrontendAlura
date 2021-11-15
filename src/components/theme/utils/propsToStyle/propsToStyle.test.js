import { propsToStyle } from './index';

describe('propsToStyle()', () => {
  describe('when receive a simple argument', () => {
    test('and it is a string', () => {
      const propsToStyleResult = propsToStyle('textAlign');
      const componentProps = { textAlign: 'center' };
      const styleResult = propsToStyleResult(componentProps);
      expect(styleResult).toEqual({ textAlign: 'center' });
    });
    test('and it is a number', () => {
      const propsToStyleResult = propsToStyle('flex');
      const componentProps = { flex: 1 };
      const styleResult = propsToStyleResult(componentProps);
      expect(styleResult).toEqual({ flex: 1 });
    });
  });
  describe('when receives an argument with breakpoints', () => {
    test('renders only one breakpoints', () => {
      const propsToStyleResult = propsToStyle('textAlign');
      const componentProps = { textAlign: { xs: 'center' } };
      const styleResult = propsToStyleResult(componentProps);
      expect(styleResult).toMatchSnapshot();
    });
    test('renders two or more breakpoints resolutions', () => {
      const propsToStyleResult = propsToStyle('textAlign');
      const componentProps = { textAlign: { xs: 'center', md: 'rigth' } };
      const styleResult = propsToStyleResult(componentProps);
      expect(styleResult).toMatchSnapshot();
    });
  });
});
