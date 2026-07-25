import { useEffect, useMemo, useState } from "react";
import { X, UserPlus, Users, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Avatar from "./Avatar";
import SearchBar from "./SearchBar";
import API from "../../services/api";
import useSocket from "../../hooks/useSocket";

const UserListModal = ({ open, onClose, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { onlineUsers = [] } = useSocket();

 
  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/users");
        setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch user list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    setSearchTerm("");
  }, [open]);

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);


  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const query = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query)
    );
  }, [users, searchTerm]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transform-gpu">
          
         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />

       
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-md bg-white/95 dark:bg-slate-900/95 border-t sm:border border-slate-200/80 dark:border-slate-800/80 rounded-t-3xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh] z-10 select-none"
          >
          
            <div className="flex justify-between items-center px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 shrink-0">
                  <UserPlus className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 truncate tracking-tight">
                    New Conversation
                  </h2>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                    Select a contact to start chatting
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90 shrink-0 cursor-pointer touch-manipulation"
              >
                <X className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            <div className="p-3 sm:p-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/30 shrink-0">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search contacts by name or email..."
              />
            </div>

            
            <div className="p-2.5 sm:p-3 flex-1 overflow-y-auto space-y-1.5 custom-scrollbar min-h-[220px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-14 gap-3 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-violet-600 dark:text-violet-400" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fetching contacts...</span>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-14 text-slate-400 text-center px-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    No contacts found
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] font-medium leading-relaxed">
                    {searchTerm ? "Try searching for another name or email" : "No registered users available right now"}
                  </p>
                </div>
              ) : (
                filteredUsers.map((item) => {
                  const isOnline = onlineUsers.includes(item._id);

                  return (
                    <button
                      type="button"
                      key={item._id}
                      onClick={() => onSelectUser(item)}
                      className="w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 text-left border border-transparent hover:border-slate-200/80 dark:hover:border-slate-700/80 group active:scale-[0.98] cursor-pointer touch-manipulation transform-gpu"
                    >
                      <Avatar
                        src={item.avatar}
                        name={item.name}
                        online={isOnline}
                        size={42}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                          {item.email}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserListModal;