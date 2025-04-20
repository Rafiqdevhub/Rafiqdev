function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      <div className="loader-spinner"></div>
    </div>
  );
}

export default Pre;
