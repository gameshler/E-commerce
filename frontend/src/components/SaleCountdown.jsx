import Countdown from "react-countdown";

const SaleCountdown = ({ endDate }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const countdownClassname = completed
      ? "flex justify-center items-center rounded-lg shadow-lg p-4 text-base font-bold bg-red-600 text-white"
      : "flex justify-center items-center bg-white rounded-lg shadow-lg p-4 text-gray-800 text-base font-bold";

    return (
      <div className={countdownClassname}>
        {completed ? (
          <span className="my-0 mx-1 font-normal">Sale Ended</span>
        ) : (
          <>
            <span className="mr-1">{days}D</span>
            <span className="mr-1">{hours}H</span>
            <span className="mr-1">{minutes}M</span>
            <span>{seconds}S</span>
          </>
        )}
      </div>
    );
  };

  return <Countdown date={endDate} renderer={renderer} />;
};

export default SaleCountdown;
