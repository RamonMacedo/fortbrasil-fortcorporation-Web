import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import ReactSelect, {
  Props as ReactSelectProps,
  OptionTypeBase,
} from 'react-select';

import { Container, Error } from './styles';
import colors from '../../styles/colors';

interface Props extends ReactSelectProps {
  name: string;
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      clearValue: (ref) => {
        ref.select.clearValue();
      },
      getValue: rest.isMulti
        ? (ref) =>
            ref.state.value?.map((option: OptionTypeBase) => option.value) || []
        : (ref) => (ref.state.value ? ref.state.value.value : ''),
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <Container isErrored={!!error}>
        <ReactSelect
          ref={selectRef}
          defaultValue={defaultValue}
          menuShouldScrollIntoView={false}
          blurInputOnSelect={false}
          captureMenuScroll={false}
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({
              ...base,
              height: 45,
              borderColor: 'hsl(0,0%,70%)',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: `${colors.primary}`,
              primary: `${colors.primary}`,
            },
          })}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Select;
