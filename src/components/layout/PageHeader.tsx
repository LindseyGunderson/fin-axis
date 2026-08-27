type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export default PageHeader;
