import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('userForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          name: 'mario',
        },
      }));
      const initialValues = { name: 'mario' };
      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'name',
          value: 'Ju',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ name: 'Ju' });
    });
  });
});
