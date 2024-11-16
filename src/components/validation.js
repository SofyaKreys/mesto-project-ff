export const hideError = (formElement, inputElement) => {
    // удалите класс ошибки с элемента input
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    formError.classList.remove('form__input-error_active');
    formError.textContent = " ";
  };


export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    }

export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
  }

export const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
};

export const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);

    });
  };

export const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    // добавьте класс ошибки элементу input
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(errorClass);
  };

export const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

    if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass) 
  } else {
    hideError(formElement, inputElement)
    
  }
  }

export const clearValidation = (formElement,{ inputSelector, submitButtonSelector, inactiveButtonClass }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement)
    });
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

