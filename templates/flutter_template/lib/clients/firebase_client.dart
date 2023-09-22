import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';

abstract class AuthClient extends ChangeNotifier {
  bool get isLoading;
  User? get currentUser;
  String? get errorMessage;

  setLoadingState(bool status);

  Future<void> loginWithEmailAndPassword(String email, String password);
  Future<void> registerWithEmailAndPassword(String email, String password);
}

class FirebaseAuthClient extends AuthClient {
  User? _user;
  bool _isLoading = false;
  String? _errorMessage;

  FirebaseAuthClient();

  @override
  get errorMessage => _errorMessage;

  @override
  get currentUser => _user;

  @override
  get isLoading => _isLoading;

  @override
  setLoadingState(bool status){
    _isLoading = status;
    notifyListeners();
  }

  @override
  Future<void> loginWithEmailAndPassword(String email, String password) async {
    try {
      setLoadingState(true);
      final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      _isLoading = false;
      _user = credential.user;
    } on FirebaseAuthException catch (e) {
      if (e.code == 'weak-password') {
        _errorMessage = 'Your passowrd is too weak';
      } else if (e.code == 'email-already-in-use') {
        _errorMessage = 'The account already exists for that email.';
      }
      _errorMessage = e.toString();
      setLoadingState(false);
    } catch (e) {
      _errorMessage = e.toString();
      setLoadingState(false);
    }
  }

  @override
  Future<void> registerWithEmailAndPassword(String email, String password) async {
    try {
      final credential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      _user = credential.user;
    } on FirebaseAuthException catch (e) {
      if (e.code == 'weak-password') {
        _errorMessage = 'Your passowrd is too weak';
      } else if (e.code == 'email-already-in-use') {
        _errorMessage = 'The account already exists for that email.';
      }
    } catch (e) {
      print(e);
    }
  }
}