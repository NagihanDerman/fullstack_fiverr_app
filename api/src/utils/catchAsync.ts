// bir fonksiyonu parametre olarak alır
// fonksiyonu çalıştırır ve hata olursa hata mw'ne yonlendirir


import { NextFunction, Request, Response } from "express";

type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: FunctionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
