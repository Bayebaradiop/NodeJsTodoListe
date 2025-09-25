import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, XCircle } from 'lucide-react';

// Fonction utilitaire pour calculer le temps restant (inline pour éviter les imports)
function calculateTimeRemaining(targetDate) {
  if (!targetDate) return null;

  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();

  if (isNaN(target) || target <= now) {
    return null; // Expiré ou invalide
  }

  const totalMs = target - now;

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs
  };
}

const CountdownTimer = ({ endDate, isCompleted = false }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!endDate || isCompleted) return;

    const calculateTimeLeft = () => {
      const timeRemaining = calculateTimeRemaining(endDate);
      if (!timeRemaining) {
        setIsExpired(true);
        setTimeLeft(null);
        return;
      }

      setTimeLeft(timeRemaining);
      setIsExpired(false);
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, isCompleted]);

  if (!endDate || isCompleted) {
    return null;
  }

  const getUrgencyLevel = () => {
    if (isExpired) return 'expired';
    if (!timeLeft) return 'normal';

    const totalHours = timeLeft.days * 24 + timeLeft.hours;
    if (totalHours < 1) return 'critical'; // Less than 1 hour
    if (totalHours < 24) return 'warning'; // Less than 24 hours
    return 'normal';
  };

  const getUrgencyStyles = (level) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getIcon = (level) => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'expired':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatTimeLeft = () => {
    if (isExpired) return 'EXPIRÉ';
    if (!timeLeft) return 'Calcul...';

    const { days, hours, minutes, seconds } = timeLeft;

    if (days > 0) {
      return `${days}j ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const urgencyLevel = getUrgencyLevel();

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyStyles(urgencyLevel)}`}>
      {getIcon(urgencyLevel)}
      <span className="font-mono">
        {isExpired ? 'EXPIRÉ' : `Temps restant: ${formatTimeLeft()}`}
      </span>
    </div>
  );
};

export default CountdownTimer;