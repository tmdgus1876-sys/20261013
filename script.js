'use strict';

// 학생 이름을 저장하는 배열
const students = [];

// 화면에서 사용할 요소들을 미리 찾아둔다
const nameInput = document.getElementById('nameInput');
const addForm = document.getElementById('addForm');
const studentList = document.getElementById('studentList');
const emptyMessage = document.getElementById('emptyMessage');
const resultName = document.getElementById('resultName');
const pickBtn = document.getElementById('pickBtn');
const resetBtn = document.getElementById('resetBtn');

// 학생 목록을 화면에 다시 그린다
function render() {
  // 기존 목록을 비운다
  studentList.innerHTML = '';

  // 학생이 한 명도 없으면 안내 메시지를 보여준다
  if (students.length === 0) {
    emptyMessage.hidden = false;
    return;
  }
  emptyMessage.hidden = true;

  // 학생 한 명씩 목록 항목을 만들어 추가한다
  students.forEach(function (name, index) {
    const li = document.createElement('li');
    li.className = 'student-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'student-name';
    nameSpan.textContent = name;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '✕';
    deleteBtn.setAttribute('aria-label', name + ' 삭제');
    // 나중에 어떤 학생인지 알 수 있게 번호를 저장해 둔다
    deleteBtn.dataset.index = String(index);

    li.appendChild(nameSpan);
    li.appendChild(deleteBtn);
    studentList.appendChild(li);
  });
}

// 학생을 한 명 추가한다
function addStudent() {
  // 앞뒤 공백을 지운 뒤 빈 이름인지 확인한다
  const name = nameInput.value.trim();
  if (name === '') {
    return;
  }
  students.push(name);
  // 입력칸을 비우고 다시 입력할 수 있게 포커스를 둔다
  nameInput.value = '';
  nameInput.focus();
  render();
}

// 등록된 학생 중 한 명을 무작위로 뽑는다
function pickRandom() {
  // 학생이 한 명도 없으면 안내 메시지를 보여준다
  if (students.length === 0) {
    resultName.textContent = '먼저 학생을 추가해 주세요';
    resultName.classList.add('is-empty');
    return;
  }
  // 0부터 (학생 수 - 1) 사이의 무작위 위치를 고른다
  const index = Math.floor(Math.random() * students.length);
  resultName.textContent = students[index];
  resultName.classList.remove('is-empty');
}

// 학생 목록과 발표자 결과를 모두 지운다
function resetAll() {
  // 초기화 전에 확인창을 띄운다
  const ok = window.confirm('학생 목록과 발표자를 모두 초기화할까요?');
  if (!ok) {
    return;
  }
  students.length = 0;
  resultName.textContent = '발표자를 뽑아주세요';
  resultName.classList.add('is-empty');
  render();
}

// 폼 제출(추가 버튼 클릭 또는 Enter)을 처리한다
addForm.addEventListener('submit', function (event) {
  // 폼이 바로 새로고침하지 않도록 막는다
  event.preventDefault();
  addStudent();
});

// 발표자 뽑기 버튼
pickBtn.addEventListener('click', pickRandom);

// 전체 초기화 버튼
resetBtn.addEventListener('click', resetAll);

// 목록 안의 삭제 버튼을 한 곳에서 처리한다(이벤트 위임)
studentList.addEventListener('click', function (event) {
  const target = event.target;
  if (!target.classList.contains('btn-delete')) {
    return;
  }
  // 저장해 둔 번호로 삭제할 학생을 찾는다
  const index = Number(target.dataset.index);
  students.splice(index, 1);
  render();
});

// 처음 화면을 그린다
render();
