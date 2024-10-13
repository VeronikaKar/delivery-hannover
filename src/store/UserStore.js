import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = !!localStorage.getItem("user");
    this._role = false;
    this._userId = false;
    this._name = false;
    this._user = false;
    this._surname = false;
    this._path = false;
    this._path = false;
    this._searchValue = false;
    this._popupAdmin = false;
    this._theme = localStorage.getItem("theme") === "true";
    makeAutoObservable(this);
  }

  setPopupAdmin(v) {
    this._popupAdmin = v;
  }
  get popupAdmin() {
    return this._popupAdmin;
  }

  setTheme(v) {
    this._theme = v;
  }
  get theme() {
    return this._theme;
  }

  setOrder(v) {
    this._theme = v;
  }
  get order() {
    return this._theme;
  }

  setPath(v) {
    this._path = v;
  }
  get path() {
    return this._path;
  }

  setSearchValue(v) {
    this._searchValue = v;
  }
  get searchValue() {
    return this._searchValue;
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setRole(role) {
    this._role = role;
  }
  setUser(user) {
    this._user = user;
  }
  setName(name) {
    this._name = name;
  }
  setSurname(surname) {
    this._surname = surname;
  }
  setUserId(userId) {
    this._userId = userId;
  }
  get isAuth() {
    return this._isAuth;
  }
  get role() {
    return this._role;
  }
  get user() {
    return this._user;
  }
  get name() {
    return this._name;
  }
  get surname() {
    return this._surname;
  }
}
