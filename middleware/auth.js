export default function ({ store, redirect }) {
  if (!store.state.user) {
    console.log('ppppppppppoo')
    return redirect('/login')
  }
}
