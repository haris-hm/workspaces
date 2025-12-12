function FormContinueButton({
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) {
  return (
    <button
      className={`flex flex-row justify-center items-center py-2 bg-blue-800 disabled:bg-indigo-900 rounded-xl md:rounded-2xl enabled:hover:brightness-110 enabled:active:brightness-90 enabled:cursor-pointer ${className}`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      <img
        src={loading ? "/icons/loading-dark.svg" : "/icons/right-arrow.svg"}
        alt="Join"
        className={`invert size-6 ${loading ? "animate-spin" : ""}`}
      />
    </button>
  );
}

export default FormContinueButton;
