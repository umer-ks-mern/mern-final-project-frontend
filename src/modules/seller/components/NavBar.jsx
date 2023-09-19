import React from "react";

const NavBar = () => {
    return (
        <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Admin Dashboard</a>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Log-out</button>
    </form>
  </div>
</nav>
    )
}

export default NavBar;