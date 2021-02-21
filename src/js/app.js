import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import dropdownUI from "./views/dropdown";

// locations.init().then((res) => {
//   console.log(res);
//   console.log(locations);
// });

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;
  const ticketsContainer = ticketsUI.container;
  const dropdownContainer = dropdownUI.container;

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketsContainer.addEventListener("click", (e) => {
    e.preventDefault();
    onAddTicketToFavorite(e);
  });

  dropdownContainer.addEventListener("click", (e) => {
    e.preventDefault();
    onRemoveTicketFromFavorite(e);
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  function onAddTicketToFavorite(e) {
    const target = e.target;

    if (target.classList.contains("add-favorite")) {
      const ticketIndex = Number.parseInt(target.dataset.index);

      dropdownUI.addFavoriteTicket(locations.lastSearch[ticketIndex]);
    }
  }

  function onRemoveTicketFromFavorite(e) {
    const target = e.target;
    if (target.classList.contains("delete-favorite")) {
      target.closest(".favorite-item").remove();
      dropdownUI.resizeDropdown();
    }
  }
});
