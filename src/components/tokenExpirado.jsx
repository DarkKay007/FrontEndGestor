// src/components/TokenExpirado.js
import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const TokenExpirado = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Token Expirado</h1>
      <p className="text-lg text-gray-600">
        Su sesión ha expirado. Por favor, inicie sesión nuevamente.
      </p>
      <Button>
        {" "}
        <Link
          to={"/"}
          className="sidebar-link px-4 py-2 text-2x2 text-yellow-400 pl-11 pr-11  rounded-xl  border-t border-l border-b border-r border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
        >
          Ir a Iniciar Sesión
        </Link>
      </Button>
    </div>
  );
};

export default TokenExpirado;
