import './NotFound.css';

const NotFound = function () {
  return (
    <div className="full-width center">
      <div>Invalid URL</div>
      <div>
        <a href="/notes/all">Click here</a> to visit home page
      </div>
    </div>
  )
}

export default NotFound