import React from 'react'
import { ViewportContext } from '@/components/craeteContext'
const ViewportProvider = ({ children }) => {
  // 顺带监听下高度，备用
  //兼容性
  const [width, setWidth] = React.useState(window.innerWidth );
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );

};

export default ViewportProvider;
