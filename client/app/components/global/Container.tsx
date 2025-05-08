
const Container = ({children, className=""}:{children: React.ReactNode, className?: string}) => {
  return (
    <div className={`container m-auto px-4 md:px-6 `+className}>{children}</div>
  )
}

export default Container