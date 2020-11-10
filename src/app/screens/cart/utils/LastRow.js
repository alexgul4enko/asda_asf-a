export default function LastRow() {
  var id, close
  this.setOpened = function(_id, _close) {
    if(id !== _id && close && typeof close === 'function') {
      close()
    }
    id = _id
    close = _close
  }
}
