function FormContinueButton({
  onClick,
  loading,
  disabled = false,
  className = "",
}) {
  return (
    <button
      className={`flex flex-row justify-center items-center py-2 bg-blue-800 rounded-xl md:rounded-2xl h-full w-2/5 md:w-1/5 hover:brightness-110 active:brightness-90 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={loading ? "/icons/loading-dark.svg" : "/icons/right-arrow.svg"}
        alt="Join"
        disabled={loading || disabled}
        className={`invert size-6 ${loading ? "animate-spin" : ""}`}
      />
    </button>
  );
}

export default FormContinueButton;
