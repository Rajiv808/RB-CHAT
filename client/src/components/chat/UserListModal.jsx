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

  // Fetch Users on Modal Open
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

  // Keyboard Close Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Filtered Users
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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-md bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh] z-10"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                  <UserPlus className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    New Conversation
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    Select a contact to start chatting
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all active:scale-95 shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            {/* Live Contact Search */}
            <div className="p-3 sm:p-4 border-b border-slate-100 bg-slate-50/30 shrink-0">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search contacts by name or email..."
              />
            </div>

            {/* Users Feed */}
            <div className="p-2 sm:p-3 flex-1 overflow-y-auto space-y-1 custom-scrollbar min-h-[220px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 sm:py-12 gap-3 text-slate-400">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-indigo-600" />
                  <span className="text-xs font-medium text-slate-500">Fetching contacts...</span>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 sm:py-12 text-slate-400 text-center px-4">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 mb-2 text-slate-300" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    No contacts found
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {searchTerm ? "Try searching for another name" : "No users available right now"}
                  </p>
                </div>
              ) : (
                filteredUsers.map((item) => {
                  const isOnline = onlineUsers.includes(item._id);

                  return (
                    <button
                      key={item._id}
                      onClick={() => onSelectUser(item)}
                      className="w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left border border-transparent hover:border-slate-200/60 group active:scale-[0.98] cursor-pointer"
                    >
                      <Avatar
                        src={item.avatar}
                        name={item.name}
                        online={isOnline}
                        size={40}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
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