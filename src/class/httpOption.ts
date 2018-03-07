const HttpOption = {
  headers: {
    GL_CLIENT_ID: "test",
    GL_CLIENT_VER: "6.2.0",
    GL_DEVICE_ID: "test",
    GL_REQ_SIGN: "DbAFblVvPro%2BIhZwys8elFfzsAlgZTku91Vg9RoWJRKGnHgoc5IKQj0lVQR4iJuwa92lSDjg8GnnnJf42CrgdfSUtjiDcApKxzAf0iHeR9zMEgtSA1lKHwTK1BZ%2BR4w%2FWzw8gjI0s2DH5me9cdpM%2FguwTUS5R7FYToO6QfYTvww%3D",
    GL_TIMESTAMP: '1512092405',
  }
}

let HttpOptionT = {
  headers: {
    GL_CLIENT_ID: "test",
    GL_CLIENT_VER: "6.2.0",
    GL_DEVICE_ID: "test",
    GL_REQ_SIGN: 'DIyBlr5gOvg1nNGVKhS9T1jxIQiiD%2B4zHlyUQYl7IM9cNesvSJ8QYen05EAGF%2FJFxLhRLb0iyoyRF7m7mCQSNzrJJhDLAwI6GdY0Wyd7MqlRxNZ4bdM7o0U1Lu520lkhxZy8LU0jiu3Y21Ww8ypX7ojzsEJL0BW%2FxGvq018LPNI%3D',
    GL_TIMESTAMP: '1512092405',
    GL_TOKEN:  'b4ef2b31-3e0d-4dc8-9ef4-81c501ec56eb'
  }
}

let RegPhone = /^1(3|4|5|7|8)\d{9}$/;

export{
  HttpOptionT,
  HttpOption,
  RegPhone,
}
