type TabContentProps = {
  id:string;
  activeTab:string;
  children: JSX.Element;
}

function TabContent({id, activeTab, children}:TabContentProps):JSX.Element | null {
  return (
    activeTab === id
      ?
      children
      : null
  );
}

export default TabContent;
