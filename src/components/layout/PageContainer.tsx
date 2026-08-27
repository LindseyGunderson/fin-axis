type PageContainerProps = {
  children: React.ReactNode;
};

function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-8 py-8">{children}</div>
  );
}

export default PageContainer;
