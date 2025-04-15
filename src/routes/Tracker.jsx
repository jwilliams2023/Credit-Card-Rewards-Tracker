import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { supabase } from '../supabaseClient';

const Tracker = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    card_name: '',
    card_type: '',
    annual_fee: '',
    signup_bonus: '',
    bonus_value: '',
    credit_limit: '',
    date_approved: '',
    date_closed: '',
    bonus_post_date: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('credit_cards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Fetch error:', error);
      else setCards(data);
    };

    fetchCards();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateCard = async () => {
    if (!newCard.card_name) return;

    const sanitizedCard = Object.fromEntries(
      Object.entries(newCard).map(([k, v]) => [k, v || null])
    );

    if (editingId) {
      const { error } = await supabase
        .from('credit_cards')
        .update(sanitizedCard)
        .eq('id', editingId);

      if (!error) {
        setCards((prev) =>
          prev.map((c) => (c.id === editingId ? { ...c, ...sanitizedCard } : c))
        );
        setEditingId(null);
      }
    } else {
      const { data, error } = await supabase
        .from('credit_cards')
        .insert([sanitizedCard])
        .select();

      if (!error && data.length > 0) {
        setCards((prev) => [data[0], ...prev]);
      }
    }

    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setNewCard({
      card_name: '',
      card_type: '',
      annual_fee: '',
      signup_bonus: '',
      bonus_value: '',
      credit_limit: '',
      date_approved: '',
      date_closed: '',
      bonus_post_date: '',
      notes: ''
    });
  };

  const handleEditCard = (card) => {
    setNewCard(card);
    setEditingId(card.id);
  };

  const handleDeleteCard = async (id) => {
    const { error } = await supabase.from('credit_cards').delete().eq('id', id);
    if (!error) setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const exportToCSV = () => {
    // Define the headers
    const headers = [
      'Card Name',
      'Card Type',
      'Annual Fee',
      'Signup Bonus',
      'Bonus Value',
      'Credit Limit',
      'Date Approved',
      'Date Closed',
      'Bonus Post Date',
      'Notes'
    ];
    
    // Map the cards data to rows
    const rows = cards.map(card => [
      card.card_name || '',
      card.card_type || '',
      card.annual_fee || '',
      card.signup_bonus || '',
      card.bonus_value || '',
      card.credit_limit || '',
      card.date_approved || '',
      card.date_closed || '',
      card.bonus_post_date || '',
      card.notes || ''
    ]);
    
    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'credit_cards.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const inputStyle = `w-full p-2 rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'} border focus:outline-none`;
  const label = (text) => <label className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{text}</label>;

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Credit Card Tracker</h1>

      <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'}`}>
        <div className="grid md:grid-cols-3 gap-6">
          {[ 
            ['Card Name', 'card_name', 'text', 'e.g. Chase Sapphire Preferred'],
            ['Annual Fee', 'annual_fee', 'number', 'e.g. 95'],
            ['Signup Bonus', 'signup_bonus', 'text', 'e.g. 60,000 points'],
            ['Bonus Value', 'bonus_value', 'number', 'e.g. 750'],
            ['Credit Limit', 'credit_limit', 'number', 'e.g. 5000'],
            ['Date Approved', 'date_approved', 'date', ''],
            ['Date Closed', 'date_closed', 'date', ''],
            ['Bonus Post Date', 'bonus_post_date', 'date', ''],
          ].map(([labelText, name, type, placeholder]) => (
            <div key={name}>
              {label(labelText)}
              <input
                type={type}
                name={name}
                value={newCard[name] || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={inputStyle}
              />
            </div>
          ))}

          <div>
            {label('Card Type')}
            <div className="relative">
              <select
                name="card_type"
                value={newCard.card_type || ''}
                onChange={(e) => setNewCard(prev => ({ ...prev, card_type: e.target.value }))}
                className={`${inputStyle} appearance-none cursor-pointer`}
              >
                <option value="">Select Type</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {label('Notes')}
          <textarea
            name="notes"
            value={newCard.notes}
            onChange={handleInputChange}
            className={`${inputStyle} w-full`}
            rows="3"
            placeholder="Additional card details, perks, restrictions, etc."
          />
        </div>

        <div className="flex justify-between items-stretch mt-4 w-full gap-3">
          <button 
            className="btn btn-primary flex-1 text-md md:text-lg px-3" 
            onClick={handleAddOrUpdateCard}
          >
            {editingId ? 'Update Card' : 'Add Card'}
          </button>
          <button
            className="btn btn-primary flex-1 text-md md:text-lg"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Cards List */}
      {cards.length > 0 && (
        <div className="mt-8">
          <h2 className={`text-xl font-semibold ml-2 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Credit Cards</h2>
          <div className="w-full overflow-hidden">
            {cards.map((card) => (
              <div key={card.id} className={`mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                <div className="grid grid-cols-8 w-full">
                  <div className="p-4 col-span-2">
                    <div className="font-semibold">{card.card_name || 'test'}</div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Type: {card.card_type || '-'}</div>
                  </div>
                  <div className="p-4">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Limit</div>
                    <div className="text-green-500">${card.credit_limit || 0}</div>
                  </div>
                  <div className="p-4">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Annual Fee</div>
                    <div>${card.annual_fee || 0}</div>
                  </div>
                  <div className="p-4">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bonus</div>
                    <div className="text-green-500">${card.bonus_value || 0}</div>
                  </div>
                  <div className="p-4 col-span-2">
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dates</div>
                    <div className="text-sm">
                      {card.date_approved && <div>Approved: {card.date_approved}</div>}
                      {card.date_closed && <div>Closed: {card.date_closed}</div>}
                      {card.bonus_post_date && <div>Bonus Post: {card.bonus_post_date}</div>}
                      {!card.date_approved && !card.date_closed && !card.bonus_post_date && '-'}
                    </div>
                  </div>
                  <div className="p-4 flex items-center">
                    <button onClick={() => handleEditCard(card)} className="text-blue-500 hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDeleteCard(card.id)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {cards.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center ml-2 mb-4">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Summary</h2>
            <button 
              className="btn btn-primary text-md px-3 py-2"
              onClick={exportToCSV}
            >
              Export CSV
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Cards</div>
              <div className="text-2xl font-bold">{cards.length}</div>
            </div>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Annual Fees</div>
              <div className="text-2xl font-bold">
                ${cards.reduce((sum, c) => sum + (parseFloat(c.annual_fee) || 0), 0)}
              </div>
            </div>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Bonus Value</div>
              <div className="text-2xl font-bold text-green-500">
                ${cards.reduce((sum, c) => sum + (parseFloat(c.bonus_value) || 0), 0)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;