import PropTypes from 'prop-types'

export default {
  data: PropTypes.shape({
    edges: PropTypes.array,
  }),
  loadNext: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
