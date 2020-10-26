export default function keyExtractor(item) {
  return item.node.id + item.node.slug
}
