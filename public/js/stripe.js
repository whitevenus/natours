import axios from "axios";

const stripe = Stripe(
  "pk_test_51OVYEgCeCfpzbJfXpmjKr9VgFJTr2p4SPUdDabrWSYI9spQuphiWi8Hh5S9Aofs7tHHIJNT6C7xcXsgEAGe84bRj00bYtYT7B5"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get check out session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
