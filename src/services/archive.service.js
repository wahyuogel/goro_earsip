import firebase from "./firebase";

const db = firebase.firestore().collection("archives");

class ArchiveService {
  getAll() {
    return db;
  }

  create(archive) {
    return db.add(archive);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new ArchiveService();