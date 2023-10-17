type Prop = {
  children: React.ReactNode;
};
function ShowError({ children }: Prop) {
  return (
    <div className="text-red-500 flex justify-center items-center">
      {children}
    </div>
  );
}
export default ShowError;
