
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <Header/>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer/>
    </div>
  )
}
