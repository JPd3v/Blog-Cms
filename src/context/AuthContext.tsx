import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface IAuthContext {
  userToken?: string | null | undefined;
  setUserToken?: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  userInfo?: IUserInfo;
  setUserInfo?: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

interface IUserInfo {
  name: string | null;
  lastName: string;
}

const initialUSerInfo = {
  name: '',
  lastName: '',
};

const AuthContext = createContext<IAuthContext>({});

export default function ContextProvider({
  children,
}: AuthContextProviderProps) {
  const [userToken, setUserToken] = useState<null | string | undefined>(null);
  const [userInfo, setUserInfo] = useState<IUserInfo>(initialUSerInfo);

  const verifyUser = useCallback(async () => {
    const controller = new AbortController();
    try {
      const req = await fetch(
        'https://blog-api-787a.onrender.com/user/refresh-token',
        {
          method: 'get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        }
      );
      const response = await req.json();

      if (req.status === 200) {
        setUserToken(response.token);
        setUserInfo(response.userInfo);
      } else {
        setUserToken('');
        setUserInfo({ name: '', lastName: '' });
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        console.log(error);
      }
    }

    setTimeout(verifyUser, 600000);
    return () => {
      controller?.abort();
    };
  }, [setUserToken]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const value = useMemo(
    () => ({
      userToken,
      setUserToken,
      userInfo,
      setUserInfo,
    }),
    [userToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
