export default function ({ store, redirect }) {
  console.log(store.state, 'storestorestorestorestore====')
  if (store.state.user) {
    return redirect('/')
  }
}
