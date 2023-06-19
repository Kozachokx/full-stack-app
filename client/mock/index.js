
const review = {
  user: 'Object(_id)',
  author: 'Nazar Kozak',
  text: `This was the most tastefull food i've ever tryied!`,
  imageUrl: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg',
  // imageUrl: '',
  // imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  verified: false,
}

const mockReview = Array(7).fill().map((el, id) => ({id, ...review}))

export const mock = {
  mockReview,
}