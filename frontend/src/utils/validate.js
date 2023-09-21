export const validateEmail = (mail) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

export const validatePassword = (password) => {
  // Usar expresiones regulares para verificar si la contraseña cumple con los requisitos
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{}|;:'",.<>?~\\/-]{8,25}$/;

  return regex.test(password);
};

export const validatePasswordLength = (password) => {
  if (password.length < 8 || password.length > 25) {
    return false;
  }
  return true;
};
export const validateName = (name) => {
  // Verificar que el nombre tenga al menos 2 caracteres
  if (name.length < 2) {
    return false;
  }

  // Verificar que el nombre no contenga caracteres especiales ni números
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return false;
  }

  return true;
};
