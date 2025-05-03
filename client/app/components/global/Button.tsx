
interface P extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  action?: () => void;
}

const Button = ({ children, action, ...props }: P) => {
  return (
    <button onClick={action} {...props}>
      {children}
    </button>
  );
};

export default Button;
