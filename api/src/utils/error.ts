type ExtendedError = Error & { status: number };

// aldigi parametrele gore hata mw'ne gondermek icin bir error nesnesi olusturur
const error = (status: number, message: string): ExtendedError => {

  // error nesnesi olusturma
  const err = new Error(message) as ExtendedError;

  // hata nesnesine status bilgisini ekleme
  err.status = status;

  // hata nesnesini dondurur
  return err;
};

export default error;
