import { createContext, ReactNode, useContext } from "react";
import { TenantsHook, useHeaders } from "./useHeaders.ts";

interface ThemeContextProps {
  children: ReactNode;
}

type Hooks =
  | {
      headersHook: TenantsHook;
    }
  | undefined;

export const RoomsContext = createContext<Hooks>(undefined);

export const RoomsHookContext: React.FC<ThemeContextProps> = ({ children }) => {
  const headersHook = useHeaders();

  return (
    <div>
      <RoomsContext.Provider
        value={{
          headersHook: headersHook,
        }}
      >
        {children}
      </RoomsContext.Provider>
    </div>
  );
};

export const useHooksContext = () => {
  const data = useContext(RoomsContext);

  if (data === undefined) {
    throw new Error("useHeaders must be used with a HeadersContext");
  }

  return data;
};
