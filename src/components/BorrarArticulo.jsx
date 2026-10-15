"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BorrarArticulo({ id, nombre, endpoint }) {
  const router = useRouter();
  const [paso, setPaso] = useState("inicio"); 
  const [error, setError] = useState("");

  async function borrar() {
    setPaso("borrando");
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}${id}/`, {
        method: "DELETE",
      });
      if (res.status === 401 || res.status === 403) {
        setError("Sin permiso para borrar.");
        setPaso("inicio");
      } else if (!res.ok && res.status !== 404) {
        setError("No se pudo borrar.");
        setPaso("inicio");
      } else {
        router.refresh();
      }
    } catch {
      setError("Sin conexión con la API.");
      setPaso("inicio");
    }
  }

  if (paso === "borrando") return <span className="text-xs text-slate-500">Borrando...</span>;

  if (paso === "confirmar") {
    return (
      <span className="inline-flex items-center gap-3">
        <button
          type="button"
          onClick={borrar}
          className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Sí, borrar
        </button>
        <button
          type="button"
          onClick={() => setPaso("inicio")}
          className="text-xs text-slate-500 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-brand"
        >
          Cancelar
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-3">
      {error && (
        <span role="alert" className="text-xs text-red-700">
          {error}
        </span>
      )}
      <button
        type="button"
        onClick={() => setPaso("confirmar")}
        aria-label={`Borrar ${nombre}`}
        className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-600"
      >
        Borrar
      </button>
    </span>
  );
}
